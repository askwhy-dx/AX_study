"""화면 촬영용 창 조작 도우미 (교육 이미지 수집용).
python shot.py list [제목일부]            창 목록
python shot.py place <제목일부> x y w h   창 이동·크기
python shot.py grab <제목일부> <출력.png> 창 영역 캡처 (창을 앞으로 가져온 뒤)
python shot.py type <제목일부> <텍스트>   글자 입력 (유니코드)
python shot.py key <제목일부> <키...>     예: ctrl+shift+grave  enter  shift+tab  esc  down
python shot.py click|rclick <제목일부> x y  창 기준 좌표 클릭
"""
import sys, time, ctypes
from ctypes import wintypes as W
from PIL import ImageGrab
sys.stdout.reconfigure(encoding='utf-8')
ctypes.windll.shcore.SetProcessDpiAwareness(2)
u = ctypes.windll.user32

VK = dict(ctrl=0x11, shift=0x10, alt=0x12, win=0x5B, enter=0x0D, esc=0x1B, tab=0x09, space=0x20, back=0x08,
          up=0x26, down=0x28, left=0x25, right=0x27, grave=0xC0, home=0x24, end=0x23, pgdn=0x22, pgup=0x21, f4=0x73, f5=0x74)


class KI(ctypes.Structure):
    _fields_ = [('wVk', W.WORD), ('wScan', W.WORD), ('dwFlags', W.DWORD), ('time', W.DWORD), ('dwExtraInfo', ctypes.c_size_t)]


class INP(ctypes.Structure):
    class _U(ctypes.Union):
        _fields_ = [('ki', KI), ('pad', ctypes.c_byte * 32)]
    _anonymous_ = ('u',); _fields_ = [('type', W.DWORD), ('u', _U)]


def send(vk=0, scan=0, flags=0):
    i = INP(type=1); i.ki = KI(vk, scan, flags, 0, 0)
    u.SendInput(1, ctypes.byref(i), ctypes.sizeof(INP))


def windows(sub=''):
    out = []
    def cb(h, _):
        n = u.GetWindowTextLengthW(h)
        if n and u.IsWindowVisible(h):
            b = ctypes.create_unicode_buffer(n + 1); u.GetWindowTextW(h, b, n + 1)
            if sub.lower() in b.value.lower():
                out.append((h, b.value))
        return True
    u.EnumWindows(ctypes.WINFUNCTYPE(W.BOOL, W.HWND, W.LPARAM)(cb), 0)
    return out


def find(sub):
    ws = windows(sub)
    if len(ws) != 1:
        raise SystemExit(f'창 {len(ws)}개: {[t for _, t in ws]}')
    return ws[0][0]


def focus(h):
    if u.IsIconic(h):
        u.ShowWindow(h, 9)
    if u.GetForegroundWindow() != h:  # Alt 는 VS Code 메뉴로 포커스를 뺏으므로 이미 앞이면 보내지 않는다
        send(VK['alt']); send(VK['alt'], flags=2)  # 포그라운드 잠금 우회
        u.SetForegroundWindow(h); time.sleep(0.4)
    if u.GetForegroundWindow() != h:
        raise SystemExit('대상 창을 앞으로 가져오지 못해 입력 중단')


def rect(h):
    r = W.RECT(); u.GetWindowRect(h, ctypes.byref(r)); return r


def main(a):
    cmd = a[0]
    if cmd == 'list':
        for h, t in windows(a[1] if len(a) > 1 else ''):
            r = rect(h); print(h, (r.left, r.top, r.right - r.left, r.bottom - r.top), t)
        return
    h = find(a[1]); focus(h)
    if cmd == 'place':
        x, y, w, hh = map(int, a[2:6]); u.MoveWindow(h, x, y, w, hh, True)
    elif cmd == 'grab':
        time.sleep(0.5); r = rect(h)
        ImageGrab.grab(bbox=(r.left, r.top, r.right, r.bottom), all_screens=True).save(a[2]); print('saved', a[2])
    elif cmd == 'type':
        for ch in a[2]:
            send(scan=ord(ch), flags=4); send(scan=ord(ch), flags=4 | 2); time.sleep(0.005)
    elif cmd == 'key':
        for combo in a[2:]:
            ks = [VK[k] if k in VK else ord(k.upper()) for k in combo.split('+')]
            for k in ks: send(k)
            for k in reversed(ks): send(k, flags=2)
            time.sleep(0.25)
    elif cmd in ('click', 'rclick'):
        r = rect(h); u.SetCursorPos(r.left + int(a[2]), r.top + int(a[3])); time.sleep(0.2)
        d, up = (8, 16) if cmd == 'rclick' else (2, 4)
        u.mouse_event(d, 0, 0, 0, 0); u.mouse_event(up, 0, 0, 0, 0)


main(sys.argv[1:])
