import React from 'react';

import {
    IonSkeletonText
} from '@ionic/react';
import { Row, Col } from 'reactstrap';

class GeneralSkeletonText extends React.Component {

    render() {
        return (
            <Row className="mx-2">
                <Col xs="3 p-1">
                    <IonSkeletonText animated className="w-100" style={{ height: '80px', borderRadius: '5px' }}></IonSkeletonText>
                </Col>
                <Col xs="9 p-1">
                    <IonSkeletonText animated style={{ height: '50px', borderRadius: '5px' }}></IonSkeletonText>
                    <IonSkeletonText animated style={{ height: '30px', borderRadius: '5px' }}></IonSkeletonText>
                </Col>
            </Row >
        )
    }
}

export default GeneralSkeletonText;