import { Plugins } from "@capacitor/core";
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { search, arrowBackOutline, locateOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { GoogleMap, withGoogleMap } from "react-google-maps";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { useDispatch } from "react-redux";

import actions from "../../actions/auth";
import axios from "../../helpers/axiosInterceptor";
import loadScript from "../../helpers/loadScript";
import { alertActions } from "../../actions/alert";

const { Geolocation } = Plugins;

const AddAddress: React.FC = (props: any) => {
  let _mapRef;

  const [mapEnabled, setMapEnabled] = React.useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
  const [apiKey, setApiKey] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [userAddress, setUserAddress] = React.useState({
    full_address: "",
    label: "",
  });

  useEffect(() => {
    axios.get("/settings/map").then((res) => {
      const apiKey = res.data.google_map_api_key;
      setApiKey(apiKey);
      loadScript(
        "https://maps.googleapis.com/maps/api/js?libraries=places&key=" +
          apiKey,
        "googleMap",
        () => setLoaded(true)
      );
    });
  }, []);

  const dispatch = useDispatch();

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then(async (results) => {
        const result = results[0];
        const latLng = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        };
        const lat = parseFloat(latLng.lat);
        const lng = parseFloat(latLng.lng);
        setCenter({ lat, lng });
        await reverseGeoCoder(lat, lng);
      })
      .catch((error) => console.error("Error", error));
  };

  const handleChange = (address) => {
    setSearchAddress(address);
  };

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });
    console.log("Coordinates", coordinates);
    const lat: number = coordinates.coords.latitude;
    const lng: number = coordinates.coords.longitude;
    setCenter({ lat, lng });
    await reverseGeoCoder(lat, lng);
  };

  const reverseGeoCoder = async (lat: number, lng: number) => {
    await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        lat +
        "," +
        lng +
        "&key=" +
        apiKey
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const results = responseJson.results;

        results.some((c) => {
          let foundAddress = false;
          switch (c.types[0]) {
            case "street_address":
              setSearchAddress(c.formatted_address);
              console.log(c.formatted_address);
              foundAddress = true;
              break;
            case "route":
            case "locality":
              setSearchAddress(c.formatted_address);
              console.log(c.formatted_address);
              foundAddress = true;
              break;
            default:
              break;
          }
          return foundAddress;
        });
        // console.log(results);
        setMapEnabled(true);
      });
  };

  const GoogleMapComponent = withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={20}
      defaultCenter={center}
      ref={(map) => (_mapRef = map)}
      // onZoomChanged={() => {
      // 	setCenter({ lat: parseFloat(_mapRef.getCenter().lat()), lng: parseFloat(_mapRef.getCenter().lng()) })
      // }}
      onDragEnd={() => {
        const lat = parseFloat(_mapRef.getCenter().lat());
        const lng = parseFloat(_mapRef.getCenter().lng());
        setCenter({ lat, lng });
        reverseGeoCoder(lat, lng);
      }}
    >
      <div className="centerMarker"></div>
    </GoogleMap>
  ));

  const submitAddress = () => {
    const { full_address, label } = userAddress;
    if (full_address.trim() === "" || label.trim() === "") return;
    const { lat, lng } = center;

    axios
      .post(`/user/address`, { full_address, label, lat, lng })
      .then((res) => {
        const data = res.data;
        dispatch(alertActions.page_loader(true));
        dispatch(
          actions.set_address({
            id: data.id,
            label: data.label,
            full_address: data.street,
          })
        );

        setTimeout(() => {
          dispatch(alertActions.page_loader(false));
          if (props.history.location.state && props.location.state.redirectTo)
            props.history.push(props.location.state.redirectTo);
          else props.history.go(-2);
        }, 150);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {!mapEnabled ? (
          <Container fluid={true} className="m-0 ">
            <Row className="my-0">
              <Col lg="5" className="p-0">
                <Row className="m-0">
                  {loaded && (
                    <PlacesAutocomplete
                      value={searchAddress}
                      onChange={handleChange}
                      onSelect={handleSelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div className="w-100 py-2 bg-white shadow-sm">
                          <InputGroup className="input-group-alternative m-0 shadow-none">
                            {!(
                              props.history.location.state &&
                              props.location.state.redirectTo
                            ) && (
                              <InputGroupAddon
                                addonType="prepend"
                                onClick={() => props.history.goBack()}
                              >
                                <InputGroupText>
                                  <IonIcon
                                    icon={arrowBackOutline}
                                    className="text-muted"
                                  />
                                </InputGroupText>
                              </InputGroupAddon>
                            )}

                            <Input
                              className="form-control-alternative"
                              placeholder="Search"
                              type="text"
                              {...getInputProps({
                                placeholder:
                                  "Enter area,street name, locality...",
                                className: "location-search-input",
                              })}
                            />
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <IonIcon icon={search} className="text-muted" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          <div className="autocomplete-dropdown-container bg-white">
                            {suggestions.map((suggestion) => {
                              const className =
                                "suggestion-item w-100 p-2 border-bottom";
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                  })}
                                >
                                  <h6 className="my-0 font-weight-bold item-name">
                                    {suggestion.formattedSuggestion.mainText}
                                  </h6>
                                  <small>
                                    {
                                      suggestion.formattedSuggestion
                                        .secondaryText
                                    }
                                  </small>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  )}

                  <h6
                    className="p-3 font-weight-weight text-warning w-100"
                    onClick={(e) => getCurrentPosition()}
                  >
                    <IonIcon
                      icon={locateOutline}
                      className="text-warning mr-1 align-text-top"
                    />
                    Use Current Location
                  </h6>
                </Row>
                {/* <Row className="m-0 px-3 py-0">
										<h6 className="font-weight-bold m-0">Popular Cities</h6>
										<Col lg="5" className="py-1 px-0">
											{[...Array(4)].map((e, i) => (
												<h5 className="font-weight-bold d-inline-block mr-2" key={i}>
													<Badge color="primary" pill className="px-4 py-2 bg-white text-muted badge badge-primary badge-pill border shadow-sm">
														New York {i}
													</Badge>
												</h5>
											))}
										</Col>
									</Row> */}
              </Col>
            </Row>
          </Container>
        ) : (
          <Container fluid={true} className="m-0 p-0">
            <Card className="bg-white border-0">
              <GoogleMapComponent
                containerElement={
                  <div style={{ height: `50vh`, position: "relative" }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
              />
              <CardBody className="py-2 px-0 pb-5 card-body rounded bg-white">
                <Form role="form">
                  <FormGroup className="m-0 border-bottom px-3 bg-white pt-3">
                    <h6 className="m-0 font-weight-bold item-name">
                      Current Marked Location
                    </h6>
                    <Input
                      placeholder="Your Current Marked Location"
                      value={searchAddress}
                      disabled
                      className="border-0 shadow-0 p-0 bg-white font-weight-bold"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup className="m-0 border-bottom p-3 bg-white">
                    <h6 className="m-0 font-weight-bold item-name">
                      Complete Address <span className="text-warning">*</span>{" "}
                    </h6>
                    <Input
                      placeholder="Your Full address"
                      className="border-0 shadow-0 p-0"
                      type="text"
                      onChange={(e) => {
                        setUserAddress({
                          ...userAddress,
                          full_address: e.target.value,
                        });
                      }}
                      value={userAddress.full_address}
                    />
                  </FormGroup>
                  <FormGroup className="m-0 p-3 bg-white">
                    <h6 className="m-0 font-weight-bold item-name">
                      Tag this location <span className="text-warning">*</span>
                    </h6>
                    <Input
                      placeholder="Like Home/Office/Work"
                      className="border-0 shadow-0 p-0"
                      type="text"
                      onChange={(e) => {
                        setUserAddress({
                          ...userAddress,
                          label: e.target.value,
                        });
                      }}
                      value={userAddress.label}
                    />
                  </FormGroup>

                  <Button
                    block
                    className="rounded fixed-bottom position-fixed"
                    color="warning"
                    size="lg"
                    type="button"
                    onClick={submitAddress}
                  >
                    Add Address
                  </Button>
                </Form>
              </CardBody>
            </Card>
            <Col
              xs="3"
              className="my-4 fixed-top bg-secondary text-center shadow rounded-pill pr-1 ml-n4"
              onClick={() => setMapEnabled(false)}
            >
              <h2 className="m-0">
                <IonIcon
                  icon={arrowBackOutline}
                  className="text-muted align-text-top"
                />
              </h2>
            </Col>
          </Container>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddAddress;
