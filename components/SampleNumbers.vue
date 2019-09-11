<script>
export default {
  name: "SampleNumbers",
  functional: true,
  props: {
    numbers: {
      type: Array,
      default: () => [
        "+1 650-555-3434（123456）",
        "+81 90-1234-5678（123456）",
        "+81 90-3214-9875（986143）",
        "+84 841 755 601（825467）"
      ]
    }
  },
  render(h, { props }) {
    return h("pre", {}, ["電話番号（確認コード）\n", props.numbers.join("\n")]);
  }
};
</script>