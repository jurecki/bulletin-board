import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  posts: [
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
    {
      _id: 2,
      author: 'kontakt@kontakt.pl',
      title: 'Room for rent',
      text: 'I have a spare room for rent. Low price!',
      updated: '2020-06-19',
      created: '2020-06-19',
      location: 'Wrocław',
      phone: '322-123-453',
      price: '20',
    }
  ],
  fetchPublishedPosts: () => console.log('function fetchPublishedPosts')
}


describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
