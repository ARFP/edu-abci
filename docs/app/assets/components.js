import { exosLevels } from './dataset.js';

export const ExoCard = {
  template: "#exo-card",
  props: {
    exo: {
        type: Object,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      levels: exosLevels
    }
  },
  methods: {
    displayLevel(level) {
        const points = "●".repeat(level) + "○".repeat(5 - level);
        const label = exosLevels[level - 1];
        return `${points}`;
    },
    exoSelect(e) {
        e.preventDefault();
        this.$emit('exo-select', this.exo);
    }
  }
}
