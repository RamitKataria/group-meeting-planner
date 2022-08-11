import "../../css/about-us.css";

import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa";
import {Typography} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import {Fade} from "react-awesome-reveal";

export default function AboutUs() {

    return (
        <div>
            <Typography
                sx={{flex: '1 1 100%', fontWeight: 'bold', my: 5, "textAlign": "center"}}
                variant="h4"
                component="div"
            >
                Our Story
            </Typography>

            <Box sx={{mx: "auto", my: 5, width: "80%"}}>
                <div className="mission-div">
                    <h2>Mission</h2>
                    <p>Nulla dignissim, quam at consequat iaculis, risus felis vestibulum augue, eget sodales sapien
                        ante in leo. Pellentesque tincidunt pellentesque augue. Pellentesque vestibulum, elit vitae
                        mattis luctus, ligula nisi mollis enim, non viverra nibh ex eu magna. Cras eu semper neque, non
                        commodo libero. Nunc sit amet volutpat sem, vitae tristique tortor. Etiam volutpat ex non ipsum
                        sodales, nec aliquet neque maximus. Donec consequat venenatis ex, a dapibus tellus efficitur ac.
                        Aenean nec ipsum elementum, convallis lorem sed, condimentum odio. Duis ut accumsan libero. Sed
                        purus ante, consequat id risus at, sodales dignissim sem. Curabitur gravida aliquet leo in
                        sollicitudin. Donec scelerisque non nisl vitae scelerisque.</p>
                    <p>Nulla dignissim, quam at consequat iaculis, risus felis vestibulum augue, eget sodales sapien
                        ante in leo. Pellentesque tincidunt pellentesque augue. Pellentesque vestibulum, elit vitae
                        mattis luctus, ligula nisi mollis enim, non viverra nibh ex eu magna. Cras eu semper neque, non
                        commodo libero. Nunc sit amet volutpat sem, vitae tristique tortor. Etiam volutpat ex non ipsum
                        sodales, nec aliquet neque maximus. Donec consequat venenatis ex, a dapibus tellus efficitur ac.
                        Aenean nec ipsum elementum, convallis lorem sed, condimentum odio. Duis ut accumsan libero. Sed
                        purus ante, consequat id risus at, sodales dignissim sem. Curabitur gravida aliquet leo in
                        sollicitudin. Donec scelerisque non nisl vitae scelerisque.</p>

                </div>

                <div className="team-div">
                    <h3>We are Honey Dip Donut, a team of four in UBC.</h3>

                    <Fade direction="right" duration="4000" triggerOnce="true">
                        <div className="section-left">
                            <div className="section-inner-div-left">
                                <img className="left image"
                                     src="https://media.giphy.com/media/PgKAsMXyo0vXFp6vj0/giphy.gif"
                                     alt="may-gif"/>
                                <h3>May Tang </h3>
                                <p className="right-description">Nulla dignissim, quam at consequat iaculis, risus felis
                                    vestibulum augue, eget sodales sapien ante in leo. Pellentesque tincidunt
                                    pellentesque augue. Pellentesque vestibulum, elit vitae mattis luctus, ligula nisi
                                    mollis enim, non viverra nibh ex eu magna. Cras eu semper neque, non commodo libero.
                                    Nunc sit amet volutpat sem, vitae tristique tortor.</p>
                                <a href="#" className="icon"><FaLinkedin/></a>
                                <a href="#" className="icon"><FaGithub/></a>
                                <a href="#" className="icon"><FaEnvelope/></a>
                            </div>
                        </div>
                    </Fade>
                    <Fade direction="left" duration="4000" triggerOnce="true">
                        <div className="section-right">
                            <div className="section-inner-div-right">
                                <img className="right1 image"
                                     src="https://media.giphy.com/media/1jXaP2LfX7eQTErugm/giphy.gif"
                                     alt="ramit-gif"/>
                                <h3>Ramit Kataria</h3>
                                <p className="left-description">Nulla dignissim, quam at consequat iaculis, risus felis
                                    vestibulum augue, eget sodales sapien ante in leo. Pellentesque tincidunt
                                    pellentesque augue. Pellentesque vestibulum, elit vitae mattis luctus, ligula nisi
                                    mollis enim, non viverra nibh ex eu magna. Cras eu semper neque, non commodo libero.
                                    Nunc sit amet volutpat sem, vitae tristique tortor.</p>
                                <a href="#" className="icon"><FaLinkedin/></a>
                                <a href="#" className="icon"><FaGithub/></a>
                                <a href="#" className="icon"><FaEnvelope/></a>
                            </div>
                        </div>

                    </Fade>
                    <Fade direction="right" duration="4000" triggerOnce="true">
                        <div className="section-left">
                            <div className="section-inner-div-left">
                                <img className="left image"
                                     src="https://media.giphy.com/media/1wX7raPRBBmIjT4kmS/giphy.gif"
                                     alt="sophie-gif"/>
                                <h3>Sophie Chai</h3>
                                <p className="right-description">Nulla dignissim, quam at consequat iaculis, risus felis
                                    vestibulum augue, eget sodales sapien ante in leo. Pellentesque tincidunt
                                    pellentesque augue. Pellentesque vestibulum, elit vitae mattis luctus, ligula nisi
                                    mollis enim, non viverra nibh ex eu magna. Cras eu semper neque, non commodo libero.
                                    Nunc sit amet volutpat sem, vitae tristique tortor.</p>
                                <a href="https://www.linkedin.com/in/sophie-chai-9115ba161/"
                                   className="icon"><FaLinkedin/></a>
                                <a href="https://github.com/sophiechai" className="icon"><FaGithub/></a>
                                <a href="mailto:chaisuefeisophie@gmail.com" className="icon"><FaEnvelope/></a>
                            </div>
                        </div>

                    </Fade>
                    <Fade direction="left" duration="4000" triggerOnce="true">
                        <div className="section-right">
                            <div className="section-inner-div-right">
                                <img className="right1 image"
                                     src="https://media.giphy.com/media/l0MYIdIrGhCuFqj72/giphy.gif"
                                     alt="tom-gif"/>
                                <h3>Tom Mo</h3>
                                <p className="left-description">Nulla dignissim, quam at consequat iaculis, risus felis
                                    vestibulum augue, eget sodales sapien ante in leo. Pellentesque tincidunt
                                    pellentesque augue. Pellentesque vestibulum, elit vitae mattis luctus, ligula nisi
                                    mollis enim, non viverra nibh ex eu magna. Cras eu semper neque, non commodo libero.
                                    Nunc sit amet volutpat sem, vitae tristique tortor.</p>
                                <a href="#" className="icon"><FaLinkedin/></a>
                                <a href="#" className="icon"><FaGithub/></a>
                                <a href="#" className="icon"><FaEnvelope/></a>
                            </div>
                        </div>
                    </Fade>
                </div>
            </Box>
        </div>
    );
}