import React from 'react';

import {
    IonSkeletonText
} from '@ionic/react';
import { Row, Col } from 'reactstrap';

class FeaturedSkeletonText extends React.Component {

    render() {
        return (
            <Row className="mx-2">
                <Col xs="6 p-1">
                    <IonSkeletonText animated className="w-100" style={{ height: '115px', borderRadius: '5px' }}></IonSkeletonText>
                    <IonSkeletonText animated style={{ height: '25px', borderRadius: '5px' }}></IonSkeletonText>
                    <IonSkeletonText animated style={{ height: '20px', borderRadius: '5px' }}></IonSkeletonText>
                </Col>
                <Col xs="6 p-1">
                    <IonSkeletonText animated className="w-100" style={{ height: '115px', borderRadius: '5px' }}></IonSkeletonText>
                    <IonSkeletonText animated style={{ height: '25px', borderRadius: '5px' }}></IonSkeletonText>
                    <IonSkeletonText animated style={{ height: '20px', borderRadius: '5px' }}></IonSkeletonText>
                </Col>

            </Row >
        )
    }
}

export default FeaturedSkeletonText;