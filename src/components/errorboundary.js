import {Component, } from 'react'

import PropTypes from 'prop-types'

import {Button} from '@mui/material';
import styled from '@emotion/styled';

    const NotFoundcontainer = styled.div`
        position: relative;
        height: 100vh;
    `
    const NotFoundBox = styled.div`
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    `
    const NotFoundError = styled.div`
        position: relative;
        height: 200px;
        margin: 0px auto 20px;
        zIndex: -1;
    `
    const NotFoundH1 = styled.h1`
        font-family: Montserrat, sans-serif;
        font-size: 236px;
        font-weight: '200';
        margin: 0px;
        color: #211b19;
        text-transform: uppercase;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        @media (max-width: 420px) {
        font-size: 115px;
      }
      @media (min-width: 420px) and (max-width: 900px) {
        font-size: 150px;
      }
    `
    const NotFoundH2 = styled.h2`
        fontWeight: 400;
        text-transform: uppercase;
        color: #211b19;
        background: #fff;
        padding: 10px 5px;
        margin: auto;
        display: inline-block;
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
    `


export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <NotFoundcontainer>
                    <NotFoundBox>
                        <NotFoundError>
                            <NotFoundH1>Oops!</NotFoundH1>
                            <NotFoundH2>Something went wrong!</NotFoundH2>
                        </NotFoundError>
                        <Button size='large' variant='contained' onClick={() => window.open('/', '_self')}> 
                            Go TO Homepage
                        </Button>
                    </NotFoundBox>
                </NotFoundcontainer>
      }
  
      return this.props.children; 
    }
  }
  
ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired 
}