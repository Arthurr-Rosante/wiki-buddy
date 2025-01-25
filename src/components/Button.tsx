interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="px-6 py-3 font-bold text-gray-700 rounded-lg bg-white border border-gray-300 shadow-md hover:text-white hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:cursor-pointer"
    >
      Ask Wiki Buddy
    </button>
  );
}
