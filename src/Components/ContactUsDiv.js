import React, {Component} from 'react';
import QueueAnim from 'rc-queue-anim';

class ContactUsDiv extends Component {
    render() {
        return (
            <React.Fragment>
                <QueueAnim style={{ backgroundColor: "#ffffff" }}>
                    <div key="a" style={{ marginTop: "80vh", align: "bottom", padding: "2%", fontWeight: "bold", fontSize: "medium" }}>
                        Contact us
                    </div>
                    <div key="b" style={{ paddingLeft: "10%", paddingRight: "10%", display: "flex" }}>
                        <div style={{ float: "right", fontSize: "small", textAlign: "center", width: "60vw"}} >
                            Phone: XXX-XXX-XXX
                            <br />
                            Email: xxx@email.com
                            <br />
                        </div>
                    </div>
                </QueueAnim>
            </React.Fragment>
        )
    }
}

export default ContactUsDiv;