import React from 'react';

const Voice = (props) => (
  <div className="voice-bar">
    <button onClick={() => {props.handleVoiceButton()}}>
      <span>Voice</span>
    </button>
  </div>
)

export default Voice;
