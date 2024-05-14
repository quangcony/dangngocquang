/**
 * Đoạn mã được cung cấp có một số vấn đề liên quan đến hiệu suất tính toán và các anti-patterns như sau:
 * 
 * 1. Trường blockchain chưa được định nghĩa trong cấu trúc của 'WalletBalance'.
 * 
 * ==> Thêm trường blockchain có kiểu là string đến cấu trúc 'WalletBalance'.
 * 
 * 2. Lỗi logic trong 'filter': Biến lhsPriority trong điều kiện if (lhsPriority > -99) không
 *  được định nghĩa trước đó trong đoạn mã.
 * 
 * ==> Giải pháp: Sử dụng biến 'balancePriority' đã được định nghĩa trước đó.
 * 
 * 3. Sử dụng Index làm key: việc sử dụng index làm key có thể dẫn đến lỗi hiệu suất và các vấn đề về render.
 * 
 * ==> Giải pháp: Sử dụng một giá trị duy nhất từ dữ liệu, như 'balance.currency' hoặc một thuộc tính khác nếu có.
 * 
 * 4. Thiếu kiểm tra lỗi cho việc lấy "balances" và "prices". Nếu một
 *  trong hai không tồn tại hoặc không đúng định dạng, đoạn mã sẽ gặp lỗi.
 * 
 * ==> Giải pháp: Hiển thị thông báo Loading... nếu "balances" hoặc "prices" không tồn tại.
 * 
 * 5. Cải thiện hiệu suất: Việc tính toán formattedBalances và rows bên ngoài các hook có thể ảnh hưởng đến
 *  hiệu suất và tối ưu hóa của React. Để đảm bảo rằng các phép tính này chỉ được thực hiện khi cần thiết,
 *  chúng ta nên đặt chúng trong các hook như useMemo. 
 *  Điều này giúp React quản lý việc render lại component một cách hiệu quả hơn.
 * 
 * ==> Giải pháp: Sử dụng hook 'useMemo' khi tính toán formattedBalances và rows.
 */

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;           // Fixed: Thêm trường blockchain.
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // Thông báo Loading... khi 'balances' hoặc 'prices' không tồn tại.
  if (!balances || !prices) {
      return <div {...rest}> Loading... </div>;
  }

  /** Fixed:
   *  Sử dụng biến 'balancePriority' thay cho biến 'lhsPriority'.
   *  Tối ưu hoá code giúp code clean hơn.
   */
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);

        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        return rightPriority - leftPriority;

      });
  }, [balances, prices]);

  // Fixed: Sử dụng useMemo để tính toán
  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    });
  }, [sortedBalances])

  /** Fixed: 
   *  Sử dụng useMemo để tính toán.
   *  Sử dụng danh sách balances đã được format.
   *  Sử dụng 'balance.currency' làm key thay cho index.
   */
  const rows = useMemo(() => {
    return formattedBalances.map(             
    (balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}                         
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );
  }, [formattedBalances])

  return <div {...rest}>{rows}</div>;
};
