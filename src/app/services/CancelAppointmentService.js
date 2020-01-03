import { isBefore, subHours } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class CancelAppointmentService {
  async run({ provider_id, user_id }) {
    const appointment = await Appointment.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    /**
     * Check if User has permission to cancel appointment
     */

    if (appointment.user_id !== user_id) {
      throw new Error("You don't have permission to cancel this appointment");
    }

    /**
     * Check if user trying to cancel too late
     */

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      throw new Error('You can only cancel appointments 2 hours in advance.');
    }

    appointment.canceled_at = new Date();

    await appointment.save(appointment);

    /**
     * Sending a email of cancel to provider
     */

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return appointment;
  }
}

export default new CancelAppointmentService();
