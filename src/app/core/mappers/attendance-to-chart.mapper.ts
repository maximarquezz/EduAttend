export function mapAttendanceToBarOption(data: any[]) {
  const styles = getComputedStyle(document.documentElement);
  const primaryColor = styles.getPropertyValue('--mat-sys-primary').trim();
  const textColor = styles.getPropertyValue('--mat-sys-secondary').trim();

  const isEmptyState =
    !data || data.length === 0 || data.every((d) => d.porcentaje === 0);

  if (isEmptyState) {
    return {
      xAxis: { show: false },
      yAxis: { show: false },
      series: [],
      graphic: {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: 'No hay datos de asistencia',
          fill: textColor,
          fontSize: 14,
        },
      },
    };
  }

  return {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}%',
    },
    xAxis: {
      type: 'category',
      data: data.map((d) =>
        d.subject_name.length > 20
          ? d.subject_name.substring(0, 20) + '...'
          : d.subject_name
      ),
      axisLabel: {
        rotate: 45,
        interval: 0,
        color: textColor,
      },
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: textColor,
        formatter: '{value}%',
      },
    },
    grid: {
      bottom: 100,
      left: 50,
      right: 20,
      top: 20,
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.porcentaje),
        barWidth: '60%',
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
          color: textColor,
        },
        itemStyle: {
          color: primaryColor,
          borderRadius: [8, 8, 0, 0],
        },
      },
    ],
  };
}
