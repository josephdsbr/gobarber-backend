import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';
import Appointment from '../models/Appointment';

class CancellationMail {
  /**
   * Creating a unique key for the job
   * (each job has to have an unique key)
   */

  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    await Mail.sendMail({
      to: `${appointment.provider.name} <>`,
      subject: 'Agendamento Cancelado',
      template: 'cancellation',
      context: {
        provider: 'iae',
        user: 'dae',
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', ás' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
