interface Imailconfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'antonio.alex.aguiar@antalexaguiar.online',
      name: 'Antonio Alexandre',
    },
  },
} as Imailconfig;
