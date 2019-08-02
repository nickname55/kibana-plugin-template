import React, { Component, Fragment } from 'react';
import {
  EuiInMemoryTable,
  EuiSpacer,
  EuiSwitch,
  EuiFlexItem,
  EuiFlexGroup,
  EuiFieldText,
  EuiNotificationBadge,
  EuiSearchBar,
  EuiFormRow
} from '@elastic/eui';
import '../less/main.less';
import axios from 'axios';


import SequenceDiagram from "react-sequence-diagram";

const onError = error => {
  console.log(error);
};

const options = { theme: "simple" };

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diagram : 'Test->China: Says Hello\n' +
          'Test->China: Says Hello\n' +
          'China-->USA: How are you?\n'
    };
  }

  async query(userId) {
    const { data } = await axios('../api/indices_view/search/'.concat(userId));
    return data;
  }

    handleKeyPress =  async interactionIdInput => {
    if (interactionIdInput.key === 'Enter') {
      console.log(interactionIdInput.target.value);
      const data = await this.query(interactionIdInput.target.value);
      console.log(data);
      data.hits.hits.forEach(function (entry) {
        console.log(entry);
      });

      this.setState({
        diagram: 'USA->China: Says Hello\n'
      })
    }
  };

  render() {
    return <div>
      <EuiFormRow label="Client id" helpText="Client id">
        <EuiFieldText></EuiFieldText>
      </EuiFormRow>
      <EuiFormRow label="Interaction id" helpText="interaction id">
        <EuiFieldText
            onKeyPress={this.handleKeyPress}
            placeholder={""}
        >
        </EuiFieldText>
      </EuiFormRow>
      <SequenceDiagram input={this.state.diagram} options={options} onError={onError} />
    </div>;
  }
}

export default Diagram;