import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody
    ,Label,Row,Col, List
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { addComment } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const req = (val) => val && val.length;
const max = (len) => (val) => !(val) || (val.length <= len);
const min = (len) => (val) => val && (val.length >= len);

function RenderComment({ comments, addComment, dishId }) {

    if (comments != null) {
        return (

            
                
            <li key={comments.dishId} className="col-md-6 col-12 m-1">
                <p>{comments.comment}</p>
                <p>--{comments.author},
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}</p>
                    <CommentForm dishId={dishId} addComment={addComment} />
            </li>
            
            

        );
    }
    else {
        return (
            <div></div>
        );
    }


}
/**
 return(
 )
 * */
class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    //this.props.dishId + values.rating, values.author, values.comment
    handleSubmit(values) {
        this.toggleModal();
        alert(JSON.stringify(this.props.dishId +" "+ values.rating + values.author + values.comment));
        this.props.addComment(this.props.dishId + values.rating);
    }
    render() {
        return (
            <div className="row">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} closeButton>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group ml-2">
                            
                            <Label htmlfor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating" id="rating" className="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                               </Col>
                            </Row>
                    
                        <Row className="form-group ml-2">
                            <Label htmlfor="name" md={12}>Your Name</Label>
                            <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            req, max: max(10),min:min(3)
                                        }}

                                    />
                                    <Errors model=".author"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            req: "Name is required",
                                            min: "Must be greater than 3 characters",
                                            max : "Must be less than 10 characters"

                                        }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group ml-2">
                            <Label htmlfor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment" rows='6' className="form-control" />
                            </Col>
                        </Row>
                        <div>
                                <Col md={12}>
                                    <Button type="submit" value="submit" color="primary" className="form-control">Submit</Button>
                                    </Col>

                            </div>
                        </LocalForm>
                        
                        
                    </ModalBody>
                </Modal>
                <div className="container offset-5">
                <Row className="form-group ml-2 mt-2">
                    <Col md={4}>
                        <Button outline type="submit"  onClick={this.toggleModal} color="primary"><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    </Col>
                    </Row>
                    </div>
              </div>
            );
    };
};

function RenderDish({ dish }) {
        
        if (dish != null) {
            return (
                <div key={dish.id} className="col-md-5 col-12 m-1">
                    <Card>
                    <CardImg width="100%" src={baseUrl+dish.image} alt={dish.Name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                    </Card>
                    </div>
            );
        }

        else {
            <div></div>
    }
    return (
        <div></div>
    );
    }





const Dishdetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return (

            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>

                </div>


                <div className="row">

                    <RenderDish dish={props.dish} />
                    <RenderComment comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />




                </div>

            </div>

        );
    else
        return (<div><h1>Else</h1></div>);
        
        }



export default Dishdetail;