export const initialState = {
  posts: {
    data: [
      { id: 1, title: 'Sprzedam rower', description: 'Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum', dateOfPublication: '2020-04-04', dateOfUpdate: '2020-04-05', email: 'test@gmail.com', status: 'draft', file: 'rower.jpg', price: '25$', phone: '884-332-111', location: 'Wroclaw' },
      { id: 2, title: 'Sprzedam telewizor SONY', description: 'Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum', dateOfPublication: '2020-04-04', dateOfUpdate: '2020-04-05', email: 'test@gmail.com', status: 'draft', file: 'tv.jpg', price: '25$', phone: '884-332-111', location: 'Wroclaw' },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  role: 'user', // user-admin-guest
};
