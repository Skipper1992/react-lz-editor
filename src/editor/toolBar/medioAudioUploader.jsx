import React, {Component} from 'react';
import {
  Upload,
  Modal,
  Button,
  Popconfirm,
  Form,
  Input,
  message,
  Tooltip,
  Icon
} from 'antd';
import {UploadImage} from '../../global/components/businessComponents';
class AudioStyleControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      audios: []
    },
    this.onAudioToggle = this.onAudioToggle.bind(this);
    this.sendAudioToEditor = this.sendAudioToEditor.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getAudioObject = this.getAudioObject.bind(this);
  }

  getAudioObject(fileObj) {
    this.state.audios = this.state.audios.concat(fileObj);
    if (!!this.state.audios) {
      this.setState({disabled: false});
    }
    this.forceUpdate();
  }

  onAudioToggle() {
    this.setState({visible: true, disabled: true,audios : []})
  }

  sendAudioToEditor() {
    this.setState({visible: false});
    let audios = this.state.audios.map((item) => {
      return item;
    });
    this.props.receiveAudio(audios);
    this.state.audios = [];
    this.forceUpdate();
  }

  handleCancel(e) {
    // console.log(e);
    this.setState({visible: false});
    this.state.audios = [];
    this.forceUpdate();
  }

  render() {
    let className = 'RichEditor-styleButton';
    let that = this;
    return (
      <div className="RichEditor-controls">
        <span className={className} onClick={that.onAudioToggle}>
          <Tooltip placement="top" title="上传音频">
            <Icon type="editor_audio"/>
          </Tooltip>
        </span>
        <Modal
          title="插入音频"
          visible={that.state.visible}
          closable={false}
          footer={[< Button key = "back" size = "large" onClick = {
            that.handleCancel
          } > 取 消 < /Button>, <Button key="submit" type="primary" size="large" disabled={that.state.disabled} onClick={that.sendAudioToEditor}> 确 定 </Button >]}>
          <UploadImage isMultiple={true}
            fileList={that.state.audios}
            isOpenModel={that.state.visible}
            limit={10}
            cbReceiver={that.getAudioObject}
            fileType="audio"
            uploadConfig={this.props.uploadConfig}/>
        </Modal>
      </div>
    )
  }
}
module.exports = AudioStyleControls;
