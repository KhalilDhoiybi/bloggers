import { InformationCircleIcon } from "@heroicons/react/24/solid";

const EmptyHome = () => {
  return (
    <div className="fixed top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-center space-y-2 text-2xl text-slate-400">
      <InformationCircleIcon className="h-24 w-24" />
      <p>
        There{"'"}s no blog posts at the moment u can create a new one at the
        form above!
      </p>
    </div>
  );
};

export default EmptyHome;
