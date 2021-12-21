let isLocal = 1

export function getPathUrl () {
  if (isLocal > 0) {
    return 'http://127.0.0.1:8000/gm/get_log_path'
  }
  return 'http://gs.wm.net/mir_v4/center/gm/get_log_path'
}

export function getFileUrl () {
  if (isLocal > 0) {
    return 'http://127.0.0.1:8000/gm/get_log_file'
  }
  return 'http://gs.wm.net/mir_v4/center/gm/get_log_file'
}

export function setLocal (local) {
  isLocal = local
}
