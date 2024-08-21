const Component = require('sools-hedera/Component')
const template = require('./template.html')
const Node = require('sools-tree/Node')
require('./style.scss')

module.exports = class Tree extends Component {
  constructor() {
    super()
    this.on('propertyChanged:node', this.b(this.onNodeChanged))
  }

  async onInit() {
    await this.onNodeChanged()
  }

  select(node) {
    this.event('selected', { node })
  }

  async onNodeChanged() {
    this.loading = true
    await this.tree.branch.load({
      children: true
    })
    await this.tree.children.load()
    if (!this.root) {
      this.calculatedRoot = this.node.branch[this.node.branch.length - 1]
      if (!this.calculatedRoot) {
        this.calculatedRoot = this.node
      }
    }
    this.loading = false
  }

}
  .define({
    name: 'tree-full',
    template,
  })
  .properties({
    tree: 'any',
    root: 'any',
    calculatedRoot: 'any',
    loading: 'any',
  })
  .variables({
    Node
  })
