const Component = require('sools-hedera/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class Branch extends Component {
  constructor() {
    super()
    this.on('propertyChanged:branch', this.b(this.update))
  }

  async onReady() {
    await this.update()

  }

  async update() {
    this.loading = true
    await this.branch.load()
    this.loading = false
  }
}
  .define({
    name: 'tree-branch',
    template,
  })
  .properties({
    branch: 'any',
    loading: 'any',
  })
