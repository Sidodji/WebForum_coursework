import React from 'react'

class Main extends React.Component {
    render() {
        return (
            <div className="main_content">
                <div className="info">
                    <section className="py-5">
                        <div className="container px-3 px-lg-5 my-15">
                            <div className="row gx-4 gx-lg-5 align-items-center">
                                <h1 className="display-5 fw-bolder">Course project "Web Forum"</h1>
                                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0"
                                                                    src="https://linkbuilder.su/images/uploads/glossary/forum.png" width="900" height="600"
                                                                    alt="..."/> </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Main
