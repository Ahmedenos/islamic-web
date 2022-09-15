let fixedBar=document.getElementsByClassName("header")[0]
let arrow=document.querySelector(".scroll-btn")
window.addEventListener('scroll',()=>{
    window.scrollY > 100 ?fixedBar.classList.add("active") : fixedBar.classList.remove("active")
    window.scrollY>500 ?arrow.classList.add("appear") : arrow.classList.remove("appear")
})
arrow.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})
let body=document.body
body.style.overflow="visible"
// ==========================links Active==========================
let sections=document.querySelectorAll("section"),
    links=document.querySelectorAll(".header ul li")
links.forEach(ele=>{
    ele.onclick=()=>{
        // document.querySelector(".header ul li.active").classList.remove("active")
        // ele.classList.add("active")
        let target=ele.dataset.filter
        sections.forEach(section=>{
            section.classList.contains(target)?section.scrollIntoView():""
        })
    }
})
// ===========================Header In Small Screens==============
let bars=document.querySelector(".bars"),
    myUl=document.querySelector(".my-ul")
bars.addEventListener("click",()=>{
    myUl.classList.toggle("show-ul")
})

// ===========================Explore===============================
let hadith=document.querySelector(".hadith"),
    explore=document.querySelector(".title .btn")
    // console.log(hadith ,explore)
explore.onclick=()=>{
    hadith.scrollIntoView()
}

// ==========================Hadith Section========================
let hadithContainer=document.querySelector(".hadith-container"),
    next=document.querySelector(".buttons .next"),
    prev=document.querySelector(".buttons .prev"),
    number=document.querySelector(".number");
var hadithIndex=0
hadithChange()
function hadithChange(){
    fetch("https://ahadith-api.herokuapp.com/api/search/ahadith/%D8%A7%D9%84%D9%84%D9%87/ar-notashkeel")
    .then(res => res.json()).then(data=>{
        hadithContainer.innerText=data.Chapter[hadithIndex].Ar_Text_Without_Tashkeel;
        next.addEventListener('click',()=>{
            hadithIndex ==1883 ? hadithIndex = 0: hadithIndex++
            hadithContainer.innerText=data.Chapter[hadithIndex].Ar_Text_Without_Tashkeel;
            number.innerText=`1883 - ${hadithIndex+1}`
        })
        prev.addEventListener('click',()=>{
            hadithIndex ==0 ? hadithIndex = 1883: hadithIndex--
            hadithContainer.innerText=data.Chapter[hadithIndex].Ar_Text_Without_Tashkeel;
            number.innerText=`1883 - ${hadithIndex+1}`
        })
    })
}
// ================================Lectures===============================
let arrVides=["https://www.youtube.com/embed/BfhwSQ_zWtg",
            "https://www.youtube.com/embed/nZHd8jlZki4",
            "https://www.youtube.com/embed/bDwGNbJOLro",
            "https://www.youtube.com/embed/mJso5-skPmg",
            "https://www.youtube.com/embed/rkCZbl08xdo"
]
let lec=document.getElementsByClassName("box"),
    video=document.querySelector("iframe")
let arrLec=Array.from(lec)
arrLec.forEach((element ,index)=> {
    element.onclick=()=>{
        video.src=arrVides[index]
    }
});
// =======================================Quran=============================
let suraContainer=document.querySelector(".sura-container")
let popExit=document.querySelector(".exit")
getSura()
function getSura(){
    fetch("http://api.alquran.cloud/v1/meta").then(res=>res.json())
    .then(data=>{
        let sura=data.data.surahs.references
        sura.forEach(ele=>{
            suraContainer.innerHTML+=`
            <div class="surah">
                <p>${ele.name} </p>
                <p>${ele.englishName}</p>
                <div class="sura-btns">
                    <button class="btn listen">استماع </button>
                    <button class="btn read">قراه</button>
                </div>
            </div>
            `
        })
        
        let suraTitle=document.querySelectorAll(".surah"),
            suraPopUp=document.querySelector(".surapop-up"),
            ayatPop=document.querySelector(".ayat");

        let listen=document.querySelectorAll(".listen")
        let read=document.querySelectorAll(".read")
        suraTitle.forEach((title,index)=>{
            title.onclick=()=>{
                fetch("http://api.alquran.cloud/v1/quran/ar.alafasy").then(response=>response.json())
                .then(dataItem=>{
                  
                    popExit.onclick=()=>{
                        suraPopUp.classList.remove("pop-show")
                        body.style.overflow="visible"
                       
                    }
                    // ====================READ Quran===================
                    let ayat=dataItem.data.surahs[index].ayahs
                read[index].onclick=()=>{ 
                ayatPop.innerHTML=""
                    ayat.forEach((ayaNum)=>{
                        textAya=ayaNum.text
                        suraPopUp.classList.add("pop-show")
                        ayatPop.innerHTML +=`<p>${ayaNum.numberInSurah}- ${textAya}</p>`
                        body.style.overflow="hidden"

                    })
                }

                // ===========================Listen Quran=======================
                // let shikh="https://server8.mp3quran.net/ahmad_huth/001.mp3"
                listen[index].onclick=()=>{
                    ayatPop.innerHTML=""
                    ayat.forEach((suraListen)=>{
                        suraPopUp.classList.add("pop-show")
                        ayatPop.innerHTML=`<p> <audio controls autoplay>
                        <source src="https://server8.mp3quran.net/ahmad_huth/00${index+1}.mp3" type="audio/mp3">
                        <source src="https://server8.mp3quran.net/ahmad_huth/0${index+1}.mp3" type="audio/mp3">
                        <source src="https://server8.mp3quran.net/ahmad_huth/${index+1}.mp3" type="audio/mp3">
                        Your browser does not support the audio element.
                      </audio> </p>`
                    })
                }
            })
            }
        })
    })
}
// ========================================Pray=================================
let cards=document.querySelector(".pray-content")
PrayTime()
function PrayTime(){
    fetch("http://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt%20Arab%20Emirates&method=8")
    .then(res=>res.json()).then(data=>{
        let times=data.data.timings;
        cards.innerHTML=""
        for(let time in times){
            cards.innerHTML+=`
            <div class="card">
                    <div class="circle">
                        <svg>
                            <circle cx="100" cy="100" r="100"></circle>
                        </svg>
                    <div class="pray-time">${times[time]}</div>
                    </div>
                <p>${time}</p>
            </div>
            `
        }
    })
}