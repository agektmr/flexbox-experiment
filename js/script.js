/*
Copyright 2012 Eiji Kitamura

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Eiji Kitamura (agektmr@gmail.com)
*/
'use_strict';

var flexDemo = angular.module('flexDemo', []);

flexDemo.value('model', {
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center"
});

flexDemo.value('text', {
  flexText: "The flex CSS property specifies ability of a flex item to alter their dimensions to fill the available space. Flex items can be stretched to use available space proportional to their flex grow factor or their flex shrink factor to prevent overflow.",
  flexGrowText: "The flex-grow CSS property specifies the flex grow factor of a flex item.",
  flexShrinkText: "The flex-shrink CSS property specifies the flex shrink factor of a flex item.",
  flexBasisText: "The flex-basis CSS property specifies the flex basis which is the initial main size of a flex item.",
  flexFlowText: "The flex-flow CSS property is a shorthand property for flex-direction and flex-wrap individual properties.",
  flexDirectionText: "The flex-direction CSS property specifies how flex items are placed in the flex container defining the main-axis and the direction (normal or reversed).",
  flexWrapText: "The flex-wrap CSS property specifies whether the children are forced into a single line or if the items can be flowed on multiple lines.",
  justifyContentText: "The justify-content CSS property aligns flex items in the main-axis of the current line. The alignment is done after the lengths and auto margins are applied. The justify-content property has no effect on single line flexboxes.",
  alignContentText: "The align-content CSS property aligns a flex container's lines within the flex container when there is extra space on the cross-axis.",
  alignItemsText: "The align-items CSS property aligns flex items of the current flex line the same way as justify-content but in the perpendicular direction.",
  alignSelfText: "The align-self CSS property aligns flex items of the current flex line overriding the align-items value. If any of the flex item's cross-axis margin is set to auto, then align-self is ignored.",
  orderText: "The order CSS property specifies the order used to lay out flex items in their flex container. Elements are laid out by ascending order of the order value. Elements with the same order value are laid out in the order they appear in the source code."
});

flexDemo.value('boxes', {});
flexDemo.value('box_list', ['A', 'B', 'C']);

flexDemo.controller('FlexboxCtrl', function($scope, model, text, boxes, box_list) {
  $scope.model = model;
  $scope.text = text;
  $scope.boxes = boxes;
  $scope.box_list = box_list;

  $scope.flexOpen = false;
  $scope.flexFlowOpen = false;
  var names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  $scope.add_box = function() {
    if ($scope.box_list.length < 10) {
      $scope.box_list.push(names[$scope.box_list.length]);
    }
    console.log($scope.box_list);
  };
  $scope.remove_box = function() {
    if ($scope.box_list.length > 2) {
      var box = $scope.box_list.pop();
      delete $scope.boxes[box];
    }
    console.log($scope.box_list);
  };
});

flexDemo.directive('boxVisual', function(box_list) {
  return {
    link: function($scope, $element, attrs) {
      $scope.box_list = box_list;
      var draw = function(list) {
        var html = '<pre>&lt;div class="box"&gt;\n';
        for (var i = 0; i < list.length; i++) {
          html += '  &lt;div class="'+list[i]+'"&gt;'+list[i]+'&lt;/div&gt;\n';
        }
        html += '&lt;/div&gt;</pre>';
        $element.html(html);
      };
      draw($scope.box_list);
      // How do I reflect that box is being added?
      $scope.$watch('box_list', function(newValue, oldValue) {
        draw(newValue);
      }, true);
    }
  };
});

flexDemo.directive('boxDefinition', function(boxes, text) {
  return {
    templateUrl: 'box-definition.html',
    scope: {
      name: '=boxDefinition',
      index: '='
    },
    link: function($scope, $element, attrs) {
      $scope.text = text;
      $scope.box = boxes[$scope.name] = {
        order: $scope.index + 1,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "auto",
        minWidth: "auto",
        minHeight: "auto",
        hoverItem: false,
        flexOpen: false
      };
    }
  };
});

flexDemo.filter('vendorPrefix', function() {
  var prefixes = ['webkit', 'moz', 'ms', 'o'];
  return function(styles) {
    var new_styles = {};
    for (var key in styles) {
      if (key.indexOf('$') === 0) continue;
      new_styles[key] = styles[key];
      var upper = key.charAt(0).toUpperCase() + key.slice(1);
      prefixes.forEach(function(prefix) {
        new_styles[prefix + upper] = styles[key];
      });
    }
    return new_styles;
  };
});