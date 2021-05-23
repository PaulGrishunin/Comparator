import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Input from './Input';
// import FormWrapper from '../containers/FormWrapper';

class Filter extends Component {
    render() {
        const {
            data: { username, email, phone },
            errors,
            handleInput,
            handleSubmit,
        } = this.props;
        return (
            <div className="openBill">
                <form action="http://foo.com" method="get">
                    <div>
                        <label htmlFor="say">What greeting do you want to say?</label>
                        <input name="say" id="say" value="Hi"/>
                    </div>
                    <div>
                        <label htmlFor="to">Who do you want to say it to?</label>
                        <input name="to" id="to" value="Mom"/>
                    </div>
                    <div>
                        <button>Send my greetings</button>
                    </div>
                </form>
            </div>
        );
    }
}

Filter.propTypes = {
    data: PropTypes.shape({
        username: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    errors: PropTypes.shape({
        username: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    handleInput: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default Filter;