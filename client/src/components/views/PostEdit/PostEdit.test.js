import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  post:
    {
      _id: 1,
      author: 'kontakt@kontakt.pl',
      title: 'Room for rent',
      text: 'I have a spare room for rent. Low price!',
      updated: '2020-06-19',
      created: '2020-06-19',
      location: 'Wrocław',
      phone: '322-123-453',
      price: '20',
    },
  fetchPublishedPosts: () => console.log('function fetchPublishedPosts'),
  getPost: () => console.log('getPost'),
  id: 1,
  match: {params: 1,}
}

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent  {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
