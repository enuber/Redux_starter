import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {

    //the field object has event handlers we need to use to return info
    renderField(field) {
        return (
            <div className="form-group">
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
            </div>
        );
    }

    render() {
        return (
            <form>
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
            </form>
        )
    }

}

export default reduxForm( {
    //form is the name of the form and the string just has to be unique
    form: 'PostsNewForm'
})(PostsNew);