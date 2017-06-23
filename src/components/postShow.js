import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {

    componentDidMount() {
        //this is a property that comes with react-router, params gives all the parameters that come with the data
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        });
    }

    render() {

        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    };
}

//ownProps is what is going to the component itself. so if it were above, it would be this.props === ownProps
function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);