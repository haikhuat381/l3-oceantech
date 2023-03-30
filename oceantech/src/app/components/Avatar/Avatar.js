import Avatar from "react-avatar-edit";
import { Button, Icon } from "@mui/material";
import React, { Component } from "react";
import { Dialog } from "@mui/material";
class CustomAvatar extends Component {
  state = {
    preview: null,
    defaultPreview: null,
    src: this.props.image,
    showModal: false,
  };

  onCropDefault = (preview) => {
    this.setState({ defaultPreview: preview });
  };

  onCrop = (preview) => {
    this.setState({ preview });
  };

  onCloseDefault = () => {
    this.setState({ showModal: false, src: this.state.defaultPreview });
    this.props.formikRoot.setFieldValue("image", this.state.defaultPreview);
  };

  onClose = () => {
    this.setState({ preview: null });
  };

  onAvatarClick = () => {
    this.setState({ showModal: true });
    console.log("click");
  };

  render() {
    return (
      <>
        <Dialog onClose={this.onCloseDefault} open={this.state.showModal}>
          <Avatar
            width={300}
            height={300}
            exportSize={300}
            onCrop={this.onCropDefault}
            onClose={this.onCloseDefault}
          />
          {this.state.defaultPreview && (
            <>
              <h5>Preview</h5>
              <img
                alt="Chọn ảnh nhân viên"
                style={{ width: "150px", height: "150px", border: "1px soild ,#eee" }}
                src={this.state.defaultPreview}
              />
            </>
          )}
        </Dialog>
        <div>
          <img
            alt="Chọn ảnh nhân viên"
            style={{
              width: "90%",
              aspectRatio: "1/1",
              cursor: "pointer",
              display: "block",
              margin: "10px auto",
              borderRadius: "50%",
            }}
            src={this.state.src}
          />
          <Button
            onClick={this.onAvatarClick}
            className="button-add-image"
            variant="contained"
            style={{ display: this.props.displayButton }}
            endIcon={<Icon>camera_alt</Icon>}
          >
            Chọn ảnh nhân viên
          </Button>
        </div>
      </>
    );
  }
}

export default CustomAvatar;
