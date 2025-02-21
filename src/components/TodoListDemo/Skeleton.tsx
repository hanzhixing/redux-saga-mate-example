const Skeleton = () => [1, 2, 3, 4, 5].map(n => (
    <tr key={n}>
        <td colSpan={4} className="text-center animate-pulse">
            <div className="h-2 bg-slate-200 rounded" />
        </td>
    </tr>
));

export default Skeleton;
