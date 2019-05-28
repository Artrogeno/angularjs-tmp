(function () {
    "use strict";
    /**
     * @ngdoc directive
     * @name artApp.common.directive:d3Mesh
     *
     * @description
     * DIrective responsável pela manibulacao do d3.js
     */
    function d3Mesh() {

        var voronoi, nodes, canvas, root, width, height, maxLength, 
            maxLength2, t, force, context, interval, colors, _element,
            colorStrokeStyle1, colorStrokeStyle2, colorfillStyle;

        var directive = {
            restrict: 'E',
            // scope: { 
            //   'width': '=',
            //   'height': '=',
            //   'fillcontainer': '=',
            //   'scale': '=',
            //   'materialType': '='
            // },
            link: _link
        };

        return directive;

        function _link(scope, element, attrs) {
            _element = element;
            colors = ['#ac1122', '#85aff2', '#9873c6', '#9873c6', '#9801a5', '#a3015a', '#00ff1d', '#019e13'];
            _mesh();
        }

        function _mesh(){
            colorStrokeStyle1 = '#9873c6';//_colorRandom( colors );
            colorStrokeStyle2 = '#9873c6';//_colorRandom( colors );
            colorfillStyle = '#85aff2';//_colorRandom( colors );

            width = window.innerWidth,
            height = window.innerHeight,
            t = 2 * Math.PI,
            maxLength = 100,
            maxLength2 = maxLength * maxLength,

            nodes = d3.range(450).map(function () {
                return {
                    x: Math.random() * width,
                    y: Math.random() * height
                };
            });

            force = d3.layout.force()
                .size([width, height])
                .nodes(nodes.slice())
                .charge(function (d, i) { return i ? -30 : -1500; })
                .on("tick", _ticked)
                .start();

            voronoi = d3.geom.voronoi()
                .x(function (d) { return d.x; })
                .y(function (d) { return d.y; });

            root = nodes.shift();

            root.fixed = true;

            canvas = d3.select(_element[0]).append("canvas")
                .attr("width", width)
                .attr("height", height)
                .on("ontouchstart" in document ? "touchmove" : "mousemove", _moved);

            context = canvas.node().getContext("2d");

            //var interval = setInterval(_eventTime, 10000);
        }

        function _moved() {
            var p1 = d3.mouse(this);
            root.px = p1[0];
            root.py = p1[1];
            force.resume();
        }


        function _ticked() {
            var links = voronoi.links(nodes);

            context.clearRect(0, 0, width, height);

            context.beginPath();
            for (var i = 0, n = links.length; i < n; ++i) {
                var d3Link = links[i],
                    dx = d3Link.source.x - d3Link.target.x,
                    dy = d3Link.source.y - d3Link.target.y;
                if (dx * dx + dy * dy < maxLength2) {
                    context.moveTo(d3Link.source.x, d3Link.source.y);
                    context.lineTo(d3Link.target.x, d3Link.target.y);
                }
            }
            context.lineWidth = 1;
            context.strokeStyle = colorStrokeStyle1;
            context.stroke();

            context.beginPath();
            var color = "", iColor = 10000;
            for (var i = 0, n = nodes.length; i < n; ++i) {
                var node = nodes[i];
                context.moveTo(node.x, node.y);
                context.arc(node.x, node.y, 2, 0, t);
            }
            context.lineWidth = 1;
            context.strokeStyle = colorStrokeStyle2;//_colorRandom( colors );//;
            context.stroke();
            context.fillStyle = colorfillStyle;//_colorRandom( colors );
            context.fill();
        }

        function _colorRandom( cs ){
            return cs[Math.floor(Math.random()*cs.length)];
        }

        function _eventTime(){
            _mesh();
        }

    
    }

    angular.module("artApp.common").directive("d3Mesh", d3Mesh);

})();