import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    //the field object has event handlers we need to use to return info
    renderField(field) {

        //this takes meta off of field and then takes touched and error from meta
        const { meta: {touched, error} } = field;

        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                {/*by passing in an arbitrary property in the field tag we can pull them off to use like props*!/*/}
                <label>{field.label}</label>
                <input
                    //this is an object that has a bunch of props like onChange onBlur etc...
                    //this is saying we won't everything to be associated with the input tag.
                    //this saves us from doing the following
                    //onChange={field.input.onChange}
                    //onFocus={field.input.onFocus}
                    //etc...
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {/*this is already apart of the field parameter so can just be pulled off*/}
                {/*the ternary checks to see if it has been touched focus/blurred then show error if exists else empty string*/}
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        //this sets up a call back function which will take us to / after the post has successed.
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        //pulling a function from props that is passed in with reduxForm. It is apart of reduxForm
        //much like when we use connect with mapStateToProps etc, connect has functionality.
        //handleSubmit is just a function that is apart of reduxForm pacakge
        const { handleSubmit } = this.props;

        return (
            //reduxForm handles state and validation only. Not saving data or making requests
            //so handleSubmit handles reduxForm side of things and if it is okay then it calls the
            //function we define to handle what we do with the data. we use .bind(this) to make sure that
            //when the function gets called the correct this gets passed through so this === component
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }

}

//values is an object that contains all values entered into the form
function validate(values) {
    //always have an errors object
    const errors = {};

    //validate the inputs from 'values', the errors.something there has to be the name field to link them
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is at least 3 characters!';
    }
    if (!values.categories) {
        errors.categories = 'Enter Some Categories';
    }
    if (!values.content) {
        errors.content = 'Please Enter Some Content Please';
    }

    //if errors is empty the form is fine to submit
    //if errors has something in it, the form will not be submitted and that it is invalid
    return errors;
}

export default reduxForm( {
    //form is the name of the form and the string just has to be unique
    form: 'PostsNewForm',
    validate
})(
    connect(null, { createPost })(PostsNew)
);