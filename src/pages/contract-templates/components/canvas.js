import React, { Component } from 'react';

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
      mouseDown: false,
      startX: 0,
      startY: 0,
      rectWidth: 0,
      rectHeight: 0,
    }
    this.src = props.src;
    this.page = props.page;
    this.parent = props.parent;
    this.img = React.createRef();
  }
  /*
    Note:
    - eversign document page max (width) 600, height 840 [ it's an estimation, not the final values ]
  */

  componentDidMount() {
    if (this.img && this.img.current) {
      this.img.current.onload = (e) => {
        if (this.img.current && this.img.current.complete) {
          this.parent.resetCanvas();
        }
      }
    }
  }

  setCanvasContainerRef = ref => {
    const { canvasContainers } = this.parent.state;
    canvasContainers[this.page] = ref;
    this.parent.setState({canvasContainers});
  }

  setInvestorCanvasRef = ref => {
    const { canvases } = this.parent.state;
    canvases[0][this.page] = ref;
    this.parent.setState({canvases});
  }

  setKBDirectorCanvasRef = ref => {
    const { canvases } = this.parent.state;
    canvases[1][this.page] = ref;
    this.parent.setState({canvases});
  }

  setCompanyDirectorCanvasRef = ref => {
    const { canvases } = this.parent.state;
    canvases[2][this.page] = ref;
    this.parent.setState({canvases});
  }

  render() {
    return (
      <div className="signer-container" ref={this.setCanvasContainerRef}>
        {this.parent.state.signers.map((item, signer) => 
          <canvas key={signer} ref={(signer === 0) ? this.setInvestorCanvasRef : (signer === 1) ? this.setKBDirectorCanvasRef : this.setCompanyDirectorCanvasRef} className={this.parent.state.editSigner ? 'signer edit' : 'signer'}></canvas>
        )}
        <img className="w-100" ref={this.img} src={this.src} alt='img'></img>
      </div>
    );
  }
}