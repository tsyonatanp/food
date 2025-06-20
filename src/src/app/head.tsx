export default function Head() {
  return (
    <>
      <script dangerouslySetInnerHTML={{
        __html: 'nl_pos = "br";'
      }} />
      <script src="/nagishli.js?v=2.3" charSet="utf-8" defer></script>
    </>
  );
} 