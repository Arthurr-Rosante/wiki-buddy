interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: Props) {
  return (
    <textarea
      {...props}
      className="w-full p-4 rounded-lg border border-gray-300 shadow-sm resize-none transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 placeholder-gray-400 "
      placeholder={`E.g. Ask for/copy&paste an article about Albert Einstein...`}
      rows={5}
    />
  );
}
