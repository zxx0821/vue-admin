<template>
  <div class="tree-container" :id="id">
    <svg class="d3-tree">
      <g class="container"></g>
    </svg>
  </div>
</template>

<script>
  import {dataMap} from "../../mock/echarts/data/dataMap";
  import * as d3 from 'd3';
  export default {
    name: "test",
    data(){
      return {
        id: '',
        zoom: null,
        index: 0,
        duration: 750,
        root: null,
        nodes: [],
        links: [],
        dTreeData: null,
        transform: null,
        margin: { top: 20, right: 30, bottom: 100, left: 50 }
      }
    },
    methods: {
      uuid () {
        function s4 () {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
        }
        return (
          s4() + s4() + '-' + s4() + '-' + s4() +  '-' + s4() + '-' + s4() + s4() + s4()
        )
      },
      /**
       * @description 获取构造根节点
       */
      getRoot () {
        let data = [dataMap]
        let flare = this.initData(data)[0]
        console.log(flare)
        let root = d3.hierarchy(flare, d => {
          return d.children
        })
        root.x0 = this.height / 2
        root.y0 = 0
        console.log("getRoot");
        return root
      },
      /**
       * @description 点击节点，展开or收缩
       */
      clickCircle (d) {
        if (!d._children && !d.children)
          return
        if (d.children) {
          this.$set(d, '_children', d.children)
          d._children.forEach(this.clickCircle)
          d.children = null
        } else {
          this.$set(d, 'children', d._children)
          d._children = null
        }
        this.$nextTick(
          () => {
            this.update(d)
          }
        )
      },
      /*鼠标移入文本触发发*/
      clickText (d) {
        console.log(d)
      },
      selectNode (node, resultId) {
        let _this = this
        resultId.push(node.id)
        Object.keys(node).forEach(function(key){
          if((key === 'parent') &&((node['parent'] !== null) &&(node['parent'] !== 'undefined') )){
            resultId.push(node[key]['id'])
            _this.selectNode(node[key], resultId)
          }
        });
        return resultId
      },
      /* 鼠标移入圆框触发
      *  mouseoverCircle
      * */
      mouseoverCircle (node) {
        let resultId = []
        let selectParent = Array.from(new Set(this.selectNode(node, resultId)))
        let len = selectParent.length
        const svg = d3.select(this.$el).select('svg.d3-tree')
        let link = svg.selectAll("path.link")
        link.attr('class', function (d) {
          if((d.id === selectParent[0]) ||(d.id === selectParent[1]) || (d.id === selectParent[2]) || (d.id === selectParent[3]) || (d.id === selectParent[4]) || (d.id === selectParent[5]) ){
            return "link link2";
          }
          return "link";
        })
      },
      /*鼠标移出圆框触发*/
      mouseoutCircle(node) {
        const svg = d3.select(this.$el).select('svg.d3-tree')
        let link = svg.selectAll("path.link")
        link.attr('class', function (d) {
          return "link";
        })
      },
      /*贝塞尔函数曲线路径*/
      diagonal (s, d) {
        return `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`
      },
      /**
       * @description 获取构造的node数据和link数据
       */
      getNodesAndLinks () {
        // treemap generate new x、y coordinate according to root node,
        // so can‘t use computed propter of vue
        this.dTreeData = this.treemap(this.root)
        this.nodes = this.dTreeData.descendants()
        this.links = this.dTreeData.descendants().slice(1)
      },
      /**
       * @description 数据与Dom进行绑定
       */
      update (source) {
        this.getNodesAndLinks()
        this.nodes.forEach(d => {
          d.y = d.depth * 180
        })
        // *************************** Nodes section *************************** //
        // Update the nodes...
        const svg = d3.select(this.$el).select('svg.d3-tree')
        const container = svg.select('g.container')
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        let node = container.selectAll('g.node')
          .data(this.nodes, d => {
            return d.id || (d.id = ++this.index)
          })
        // Enter any new sources at the parent's previous position.
        let nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr('transform', d => {
            return 'translate(' + source.y0 + ',' + source.x0 + ')'
          })
        nodeEnter.append("circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return d.children || d._children ? "lightsteelblue" : "#fff"; })
          .on('click', this.clickCircle)
          .on('mouseover', this.mouseoverCircle)
          .on('mouseout', this.mouseoutCircle);


        nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -15 : 15; })
          .attr("dy", ".35em")
          .on('click', this.clickText)
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.data.name })
          .style("fill-opacity", 1e-6);
        // Transition nodes to their new position.
        let nodeUpdate = nodeEnter.merge(node)
          .transition()
          .duration(this.duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
          .attr("r", 5)
          .attr("fill", "white")
          .attr("stroke", "blue")
          .attr("stroke-width", 1)
          .style("fill", function(d) { return d.children || d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text")
          .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        let nodeExit = node.exit()
          .transition()
          .duration(this.duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .remove();

        nodeExit.select("circle")
          .attr("r", 1e-6);

        nodeExit.select("text")
          .style("fill-opacity", 1e-6);

        // *************************** Links section *************************** //
        // Update the links…
        let link = container.selectAll('path.link')
          .data(this.links, d => {
            return d.id
          })

        // Enter any new links at the parent's previous position.
        let linkEnter = link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", d => {
            let o = {x: source.x0, y: source.y0};
            return this.diagonal(o, o)
          })
          .attr("fill", 'none')
          .attr("stroke-width", 2)
          .attr('stroke', '#ccc')
        // Transition links to their new position.
        let linkUpdate = linkEnter.merge(link)
        linkUpdate.transition()
          .duration(this.duration)
          .attr('d', d => { return this.diagonal(d, d.parent) })

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
          .duration(this.duration)
          .attr("d", d => {
            let o = {x: source.x, y: source.y};
            return this.diagonal(o, o)
          })
          .remove();

        // Stash the old positions for transition.
        this.nodes.forEach(d => {
          d.x0 = d.x
          d.y0 = d.y
        })
      },
      /**
       * @description control the canvas zoom to up or down
       */
      zoomed () {
        d3.select(this.$el).select('g.container').attr('transform', d3.event.transform)
      },
      initData(data) {
        let _this = this;
        for (let i = 0; i < data.length; i++) {
          data[i].children = data[i].dictionaryChildNode;
          data[i].name = data[i].nodeName;
          if (data[i].dictionaryChildNode && data[i].dictionaryChildNode.length > 0) {
            _this.initData(data[i].dictionaryChildNode);
          }
        }
        return data
      }
    },
    mounted () {
      //创建svg画布
      let _this = this
      this.width = document.getElementById(this.id).clientWidth
      this.height = document.getElementById(this.id).clientHeight
      const svg = d3.select(this.$el).select('svg.d3-tree')
        .attr('width', this.width)
        .attr('height', this.height)
      const transform = d3.zoomIdentity.translate(this.margin.left, this.margin.top).scale(1)
      const container = svg.select('g.container')
      // init zoom behavior, which is both an object and function
      this.zoom = d3.zoom()
        .scaleExtent([1 / 2, 8])
        .on('zoom',function () {

        })
      this.root = this.getRoot()
      this.update(this.root)
      this.root.children.forEach(function (item) {
        item.children.forEach(function (temp) {
          _this.clickCircle(temp)
        })
      })
    },
    created() {
      this.id = this.uuid()
    },
    computed: {
      treemap () {
        console.log("treemap");
        return d3.tree().size([this.height, this.width])
      }
    }

  }
</script>

<style lang="less">
  .tree-container {
    width: 100%;
    height: 2000px;
  }

  .d3-tree {
    .node {
      cursor: pointer;
    }

    .node circle {
      fill: #fff;
      stroke: steelblue;
      stroke-width: 1.5px;
    }

    .node text {
      font: 14px sans-serif;
    }

    .link {
      fill: none;
      stroke: #ccc;
      // stroke-width: 10px;
    }
    .link2 {
      fill: none;
      stroke: #f00;
      stroke-width: 4px;
    }
  }
</style>
