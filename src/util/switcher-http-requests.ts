const SWITCHER_BASEURL = process.env.REACT_APP_CAM_BASEURL || 'http://localhost:4000/api';

export async function getSwitcherStatus(): Promise<{ input: number } | null> {
  try {
    const response = await fetch(`${SWITCHER_BASEURL}/switcher/status`);
    if (!response.ok) throw new Error('Switcher status request failed');
    return response.json();
  } catch (error) {
    console.log('Switcher status error:', error);
    return null;
  }
}

export async function selectSwitcherInput(input: number): Promise<number | null> {
  try {
    const response = await fetch(`${SWITCHER_BASEURL}/switcher/input/${input}`);
    if (!response.ok) throw new Error(`Switcher select input ${input} failed`);
    const data = await response.json();
    return data.input ?? null;
  } catch (error) {
    console.log('Switcher select error:', error);
    return null;
  }
}
