export function onOpenBarFunction(open: boolean) {
    open = !open;
    const sideBar = document.getElementById('side-bar')!;
    const content = document.getElementById('content')!;
    
    if(sideBar.classList.contains("col-2")) {
        sideBar.classList.remove("col-2");
        content.classList.remove("col-10");

        sideBar.classList.add("col-1-p");
        content.classList.add("col-11-p");
        return open;
    }

    sideBar.classList.remove("col-1-p");
    content.classList.remove("col-11-p");

    sideBar.classList.add("col-2");
    content.classList.add("col-10");

    return open;
}