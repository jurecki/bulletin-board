import React from 'react';
import ImageUploader from 'react-images-upload';
import styles from './submitPostForm.module.scss';
import PropTypes from 'prop-types';
import { initialState } from '../../redux/initialState';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class SubmitPostForm extends React.Component {
        state = {
                post: {
                        id: initialState.posts.data.length + 1,
                        title: '',
                        description: '',
                        dateOfPublication: '',
                        dateOfUpdate: new Date().toISOString().slice(0, 10),
                        email: '',
                        status: 'draft',
                        photo: '',
                        price: '',
                        phone: '',
                        location: '',
                        file: null,
                },

        }

        static propTypes = {
                children: PropTypes.node,
                className: PropTypes.string,
                posts: PropTypes.node,
                postEdit: PropTypes.object,
                match: PropTypes.object,
                action: PropTypes.func,
        };

        handleChange = (e) => {
                const value = e.target.value;
                const name = e.target.name;

                this.setState({
                        post: {
                                ...this.state.post,
                                [name]: value,
                        },
                });
        }

        handleSubmit = (e) => {
                e.preventDefault();
                const { post } = this.state
                const { action, type } = this.props
                let error = null;
                console.log('Data akutalizacji', post.dateOfUpdate, 'Data publikacji', post.dateOfPublication)

                // if (post.title.length < 10) error = `Tytuł powinien mieć min. 10 znaków`;
                // else if (post.description.length < 20) error = `Opis powinien mieć min. 20 znaków`;
                // else if (!post.email) error = "Musisz dodać poprawny adres email"
                // else if (!post.dateOfPublication) error = 'Musisz podać datę publikacji ogłoszenia'

                if (!error) {
                        action(this.state.post);
                        alert(`Your post has been ${type}`)
                        this.setState({
                                post: {
                                        id: initialState.posts.data.length + 1,
                                        title: '',
                                        description: '',
                                        dateOfPublication: '',
                                        dateOfUpdate: new Date().toISOString().slice(0, 10),
                                        email: '',
                                        status: 'draft',
                                        price: '',
                                        phone: '',
                                        location: '',
                                        file: null,
                                },
                        })
                }
                else {
                        alert(error)
                }
        }

        setPhoto = (files) => {
                const { post } = this.state;

                if (files) this.setState({ post: { ...post, file: files[0].name } });
                else this.setState({ post: { ...post, file: null } });
        }
        componentDidMount() {
                const { postEdit } = this.props;
                console.log([postEdit.file])
                if (postEdit) {
                        this.setState({
                                post: {
                                        id: postEdit.id,
                                        title: postEdit.title,
                                        description: postEdit.description,
                                        dateOfPublication: postEdit.dateOfPublication,
                                        dateOfUpdate: new Date().toISOString().slice(0, 10),
                                        email: postEdit.email,
                                        status: postEdit.status,
                                        price: postEdit.price,
                                        phone: postEdit.phone,
                                        location: postEdit.location,
                                        file: postEdit.file,
                                }
                        })
                }

        }


        render() {
                const { post, value } = this.state;
                const { postEdit } = this.props;
                return (
                        <form>
                                <label htmlFor='title'> Tytuł ogłoszenia:
                <input id='title' type='text' name='title' value={this.state.post.title} onChange={this.handleChange} required />
                                </label>
                                <label htmlFor='description'>Opis produktu:
                <textarea id='description' cols={40} rows={5} name='description' value={this.state.post.description} onChange={this.handleChange} required />
                                </label>
                                <br />
                                <label>Dodaj zdjęcie
              <ImageUploader
                                                withIcon={true}
                                                buttonText='Choose image'
                                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                maxFileSize={5242880}
                                                withPreview={true}
                                                onChange={this.setPhoto}
                                                singleImage={true}
                                                className={styles.photo}
                                        />
                                </label>
                                <label htmlFor='price'>Cena:
                <input id='price' type='text' name='price' value={post.price} onChange={this.handleChange} />
                                </label>
                                <label htmlFor='email'> Adres e-mail:
                <input id='email' type='email' name='email' value={post.email} onChange={this.handleChange} required />
                                </label>
                                <label htmlFor='phone'> Nr telefonu:
                <input id='phone' type='text' name='phone' value={post.phone} onChange={this.handleChange} />
                                </label>
                                <label htmlFor='location'> Lokalizacja:
                <input id='location' type='text' name='location' value={post.location} onChange={this.handleChange} />
                                </label>
                                <label htmlFor='status'>Status:
                <select id='status' name='status' value={value} onChange={this.handleChange} >
                                                <option value='draft'>Szkic</option>
                                                <option value='published'>Opublikowane</option>
                                                <option value='closed'>Zamknięte</option>
                                        </select>
                                </label>
                                <br />
                                <label htmlFor='dateOfPublication'> Data publikacji:
                <input type='date' name='dateOfPublication' value={post.dateOfPublication} onChange={this.handleChange} required />
                                </label>
                                <Button variant='contained' onClick={this.handleSubmit}>{postEdit ? 'Edytuj' : 'Dodaj'} </Button>
                                <Button component={Link} to={`${process.env.PUBLIC_URL}/`} variant="contained">ANULUJ</Button>
                        </form>

                )

        }
}

export default SubmitPostForm;
