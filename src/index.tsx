/**
 * @class Image
 */

import * as React from 'react';

export type Props = { src: string }
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
      <img src={this.state.imageSrc} />
    )
  }

  public componentDidMount(): void {
    this.getBase64ImageFromUrl(this.props.src).then(src => 
      this.setState({imageSrc: src})
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
