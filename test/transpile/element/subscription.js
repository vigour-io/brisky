const getListeners = ({ subs }, type) => {
  if (!subs._) subs._ = {}
  if (!subs._[type]) subs._[type] = []
  return subs._[type]
}

exports.getListeners = getListeners
