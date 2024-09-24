export const toastVariants = {
    hidden:{opacity:0,x:"100%"},
    visible:{
        opacity:1,x:0,
        transition:{
            type:"spring",
            duration:0.6,
            damping:15,
            stiffness:300,
        },
        
    },
    exit:{opacity:0,x:-400}
    
}

export const containerVariants = {
    hidden:{opacity:0,y:"-100%"},
    visible:{
        opacity:1,y:0,
        transition:{
            type:"spring",
            duration:0.7,
            damping:20,
         
            stiffness:200,
            delay:0.2
        },
        
    },
    
    
}
export const questionVariants = (direction) => ({
hidden:{
    opacity:0,
    x: direction === "right" ? 50:-50,
},
visible:{
    x:0,
    opacity:1,
    transition:{
        type:"tween",
        ease:"easeInOut",
        duration:0.6
    }
},
exit:{
 x:direction === "left" ? -20:20,
 opacity:0,
 transition:{
    duration:0.3
 }   
}
})