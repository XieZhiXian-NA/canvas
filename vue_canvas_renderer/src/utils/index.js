// 碰撞检测
 
// export function hitTestRectangle(objA,objB){
 
//     // 没有碰撞
//     //   objA.x+objA.width < objB.x &&
//     //   objB.x+objB.width < objA.x &&
//     //   objA.y+ objA.height < objB.y &&
//     //   objB.y+ objB.height < objA.y

//     // 碰撞
//      return (
//          objA.x+ objA.width >= objB.x &&
//          objB.x+ objB.width >= objA.x &&
//          objA.y+ objA.height >= objB.y &&
//          objB.y+ objB.height >= objA.y
//      ) 
// }


// 写碰撞
export function hitTestRectangle(objA, objB) {
   
    return (
      objA.x + objA.width >= objB.x &&
      objB.x + objB.width >= objA.x &&
      objA.y + objA.height >= objB.y &&
      objB.y + objB.height >= objA.y
    );
  }
  