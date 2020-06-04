export const initialState = {
  posts: {
    data: [
      { id: 1, title: 'Sprzedam rower', description: 'Lorem Ipsum', dateOfPublication: '2020-04-04', dateOfUpdate: '2020-04-05', email: 'test@gmail.com', status: 'draft', photo: 'https://www....', price: '25$', phone: '884-332-111', location: 'Wroclaw' },
      { id: 2, title: 'Sprzedam telewizor SONY', description: 'Lorem Ipsum', dateOfPublication: '2020-04-04', dateOfUpdate: '2020-04-05', email: 'test@gmail.com', status: 'draft', photo: 'https://www....', price: '25$', phone: '884-332-111', location: 'Wroclaw' },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  role: 'admin', // user-admin-guest
};
