const structureNotifications = (postTitle: string, creatorUsername: string, type: string) => {
    const structType = structureNotificationType(type)
    const text  = " لقد تم " + structType.res  + " المقال '" + postTitle  + "' من طرف '" + creatorUsername + "'"

  return {text, ...{color: structType.color}}
}

const structureNotificationType = (type: string) => {
  let res = ""
  let color = ""

  switch(type) {
    case "draft": {
      res = "تعليق";
      color = "grey"
      break
    }
    case "archived": {
      res = "تعليق";
      color = "grey"
      break
    }
    case "delete": {
      res = "حذف";
      color = "red"
      break
    }
    case "deleted": {
      res = "حذف";
      color = "red"
      break
    }
    case "create": {
      res = "اضافة";
      color = "green"
      break
    }
    case "created": {
      res = "اضافة";
      color = "green"
      break
    }
    case "publish": {
      res = "نشر";
      color = "#3987c9"
      break
    }
    case "published": {
      res = "نشر";
      color = "#3987c9"
      break
    }
    case "edited": {
      res = "تعديل"
      color = "white"
      break
    }
  }

  return {res, color}
}

export default structureNotifications