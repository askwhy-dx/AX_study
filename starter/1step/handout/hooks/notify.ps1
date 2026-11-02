param([string]$Kind = "stop")
# Claude Code 대기 알림: 토스트 + 효과음. 훅을 막지 않도록 자기 자신을 분리 실행한다.
if (-not $env:CC_NOTIFY_CHILD) {
  $env:CC_NOTIFY_CHILD = "1"
  # 훅 입력(stdin JSON)의 cwd 에서 폴더 이름만 꺼내 자식에게 환경변수로 넘긴다
  try {
    [Console]::InputEncoding = [Text.Encoding]::UTF8
    $env:CC_NOTIFY_DIR = Split-Path -Leaf ([Console]::In.ReadToEnd() | ConvertFrom-Json).cwd
  } catch {}
  Start-Process powershell -WindowStyle Hidden -ArgumentList "-NoProfile","-ExecutionPolicy","Bypass","-File","`"$PSCommandPath`"",$Kind
  exit
}
if ($Kind -eq "notify") { $msg = "권한 확인이나 입력이 필요합니다"; $wav = "Windows Notify System Generic.wav" }
else { $msg = "응답 완료, 입력을 기다리는 중"; $wav = "Windows Notify.wav" }

# 알림 머리줄의 앱 이름·아이콘 = HKCU 에 등록한 AppUserModelId (설치 없이 동작)
$appId = "ClaudeCode.Notify"
$icon = "$PSScriptRoot\claude.png"  # 없어도 된다. 있으면 알림에 그림이 붙는다
$key = "HKCU:\Software\Classes\AppUserModelId\$appId"
New-Item $key -Force | Out-Null
Set-ItemProperty $key DisplayName "Claude Code"
if (Test-Path $icon) { Set-ItemProperty $key IconUri $icon }

[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null
$e = { param($s) [Security.SecurityElement]::Escape($s) }
$xml = New-Object Windows.Data.Xml.Dom.XmlDocument
$xml.LoadXml(@"
<toast><visual><binding template="ToastGeneric">
$(if (Test-Path $icon) { "<image placement=`"appLogoOverride`" src=`"$(& $e $icon)`"/>" })
<text>$(& $e $env:CC_NOTIFY_DIR)</text>
<text>$(& $e $msg)</text>
</binding></visual><audio silent="true"/></toast>
"@)
[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId).Show((New-Object Windows.UI.Notifications.ToastNotification $xml))
(New-Object Media.SoundPlayer "$env:WINDIR\Media\$wav").PlaySync()
