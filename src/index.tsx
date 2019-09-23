/**
 * @class Image
 */

import * as React from 'react';

export type Props = { 
  src: string
  className?: string;
  alt?: string;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
  onClick?: React.EventHandler<React.MouseEvent<HTMLImageElement>> | undefined;
  onMouseOver?: React.EventHandler<React.MouseEvent<HTMLImageElement>> | undefined;
  onMouseOut?: React.EventHandler<React.MouseEvent<HTMLImageElement>> | undefined;
  ref?: React.RefObject<HTMLImageElement>;
}

export type State = { imageSrc: string | undefined }

export default class Image extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imageSrc: ""
    }
  }

  render() {
    return (
      <img src={this.state.imageSrc} 
          className={this.props.className} 
          alt={this.props.alt} 
          height={this.props.height} 
          width={this.props.width} 
          style={this.props.style} 
          onClick={this.props.onClick}
          onMouseOver={this.props.onMouseOver}
          onMouseOut={this.props.onMouseOut}
          ref={this.props.ref}
        />
    )
  }

  public componentDidMount(): void {
    this.getBase64ImageFromUrl(this.props.src).then(src =>
      this.setState({ imageSrc: src })
    );
  }

  private async getBase64ImageFromUrl(imageUrl: string): Promise<string> {
    let res = await fetch(imageUrl);
    let blob = await res.blob();

    return new Promise<string>((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result as string);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
}
