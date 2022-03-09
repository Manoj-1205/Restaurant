import React from 'react';

import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderMenuItem({dish}){
        return (
            <Card>
                <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={baseUrl+dish.image} alt={dish.Name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>

                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }
    
   
const Menu = (props) => {
        const menu = props.dishes.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish}  />

                </div>
            );
        }
    );
        if (props.dishes.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
     else
        return (
            <div className="container">
                <div className="row m-2">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    {menu}   
                </div>
                
            </div>
            );
    }

    


export default Menu;