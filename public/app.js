import React from 'react';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import { render, unmountComponentAtNode } from 'react-dom';

import 'ui/autoload/styles';
import './less/main.less';
import { Main } from './components/main';


const app = uiModules.get('apps/indicesView');

app.config($locationProvider => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });
});
app.config(stateManagementConfigProvider =>
  stateManagementConfigProvider.disable()
);

function RootController($scope, $element, $http) {
  const domNode = $element[0];

  render(<Main title="indices_view" httpClient={$http} />, domNode);

  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('indicesView', RootController);
