import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <nav className="p-5">
        <a href="/">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="w-10 " />
                <div className="ml-3 font-bold text-base text-primary">Project</div>
            </div>
        </a>
    </nav>
  )
}
